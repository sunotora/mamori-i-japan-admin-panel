import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Typography } from 'antd';
import moment from 'moment';
import OperationButtons from '../../components/OperationButtons';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import {
  getOrganizationsAction,
  deleteOrganizationAction,
  getOrganizationAction,
  clearOrganizationAction,
} from '../../redux/Organization/actions';
import { Store } from '../../redux/types';
import accessPermission from '../../constants/accessPermission';

const { Title } = Typography;

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { translate } = useContext(I18nContext);
  const loading = useSelector((store: Store) => store.loading.isLoading);
  const { listData } = useSelector((store: Store) => store.organization);

  const fetchData = useCallback(() => dispatch(getOrganizationsAction()), [
    dispatch,
  ]);

  const deleteItem = useCallback(
    (id) => dispatch(deleteOrganizationAction({ id })),
    [dispatch]
  );

  const getItem = useCallback((id) => dispatch(getOrganizationAction({ id })), [dispatch]);

  const clearDetailItem = useCallback(() => dispatch(clearOrganizationAction()), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    clearDetailItem();
    history.push('/organizations/create');
  };

  const handleEdit = (id: string) => {
    getItem(id);
    history.push(`/organizations/${id}`);
  };

  const columns: any = [
    {
      title: 'organizationCode',
      dataIndex: 'organizationCode',
    },
    {
      title: 'organizationName',
      dataIndex: 'name',
    },
    {
      title: 'message',
      dataIndex: 'message',
    },
    {
      title: 'createdDate',
      dataIndex: 'createdAt',
      render: (value: any) =>
        moment(new Date(value * 1000)).format('YYYY-MM-DD HH:MM'),
    },
    {
      title: 'operation',
      render: ({ id }: { id: string }) => {
        const props: any = {
          handleEdit: () => handleEdit(id),
        };

        if (accessPermission.isAdminUser()) {
          props.deleteItem = () => deleteItem(id)
        }
        return <OperationButtons {...props} />;
      },
    },
  ];

  return (
    <ContentContainer>
      <header>
        <Title level={3}>
          {translate('organization') + translate('list')}
        </Title>
        {accessPermission.isAdminUser() && (
          <Button type="primary" size="large" onClick={handleCreate}>
            {translate('createItem')}
          </Button>
        )}
      </header>

      <section>
        <Table
          loading={loading}
          dataSource={listData}
          rowKey={(record: any) => record.id}
          columns={columns.map((item: any) => {
            return {
              ...item,
              title: translate(item.title),
            };
          })}
          pagination={false}
        />
      </section>
    </ContentContainer>
  );
};
