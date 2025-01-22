export interface Message {
    date: string | Date,
    title: string,
    body: string,
}

export type Messages = Message[];
