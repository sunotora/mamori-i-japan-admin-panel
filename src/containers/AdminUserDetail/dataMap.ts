import Validation from '../../constants/Validation';
import { prefectureList } from '../../constants/Prefecture'

type RoleOption = {
  id: string;
  name: string;
}

type FormItem = {
  name: string;
  type: string;
  label: string;
  selectOptions?: RoleOption[];
  rules: any[];
  onChange?: () => void;
}

const roleOptions: RoleOption[] = [
  {
    id: '0',
    name: 'Super Admin',
  },
  {
    id: '1',
    name: 'National Admin',
  },
  {
    id: '2',
    name: 'Prefecture Admin',
  },
  {
    id: '3',
    name: 'Organization Admin',
  },
];

const dataMap: FormItem[] = [
  {
    name: 'email',
    type: 'input',
    label: 'email',
    rules: [Validation.required, Validation.email],
  },
  {
    name: 'role',
    type: 'select',
    label: 'role',
    selectOptions: roleOptions,
    rules: [Validation.required],
  },
];

const prefectureForm = {
  name: 'prefecture',
  type: 'select',
  label: 'prefecture',
  selectOptions: prefectureList.map((prefectureName, index) => ({
    id: index.toString(),
    name: prefectureName,
  })),
  rules: [Validation.required],
};

export { prefectureForm, roleOptions };
export type { RoleOption, FormItem };
export default dataMap;
