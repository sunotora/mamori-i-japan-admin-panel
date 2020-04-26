import React, { useContext, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { I18nContext } from '../../locales';
import { ContentContainer } from '../../components/CommonStyles';
import prefecturesMap from '../../constants/Prefecture';
import EditableTabel, {
  ColumnTypeWithEditable,
} from '../../components/EditableTable';
import { getMessagesAction } from '../../redux/Message/actions';

const { Title } = Typography;

interface RecordType {
  key: string;
  id: number;
  content: string;
  address: string;
}

export default () => {
  const { translate } = useContext(I18nContext);
  const dispatch = useDispatch();

  const loading = useSelector((store: any) => store.loading.isLoading);
  const listData = useSelector((store: any) => store.message.listData);

  const fetchData = useCallback(() => dispatch(getMessagesAction()), [
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: Array<ColumnTypeWithEditable<RecordType>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      editable: true,
    },
    {
      title: 'prefecture',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      render: (value: string) => prefecturesMap['ja'][value],

    },
  ];

  return (
    <ContentContainer>
      <header>
        <Title level={4}>{translate('list')}</Title>
      </header>

      {console.log(listData)}

      <section>
        <EditableTabel<RecordType>
          loading={loading}
          dataSource={listData}
          columns={columns.map((item: ColumnTypeWithEditable<RecordType>) => ({
            ...item,
            title: translate(item.title),
          }))}
        />
      </section>
    </ContentContainer>
  );
};
