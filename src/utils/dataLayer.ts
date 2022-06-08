import { IDLItem } from 'types/scandiweb-de-test-task';

const ss: string | null = sessionStorage.getItem('dataLayer');

export const dataLayer: IDLItem[] = ss ? JSON.parse(ss) : [];

export const addDataLayerItem = (item: IDLItem): void => {
  dataLayer.push({ ecommerce: null });
  dataLayer.push(item);
  sessionStorage.setItem('dataLayer', JSON.stringify(dataLayer));
};
