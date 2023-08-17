import * as yup from 'yup';

const RegisterSchema = yup.object({
  sicilno: yup
    .number()
    .typeError('girilen değer numerik olmalıdır')
    .required('Sicil no gereklidir'),
  sicilnoConfirm: yup
    .number()
    .typeError('girilen değer numerik olmalıdır')
    .oneOf([yup.ref('sicilno'), null], 'Sicil numaraları eşleşmiyor')
    .required('Sicil numarası tekrar gereklidir'),
});

export default RegisterSchema;
