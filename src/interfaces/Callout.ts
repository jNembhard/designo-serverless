export interface ICallout {
  TableName: string;
  Item: ICalloutItem;
}

interface ICalloutItem {
  calloutID: string;
  title: string;
  description: string;
  calloutImageUrl: string;
}
