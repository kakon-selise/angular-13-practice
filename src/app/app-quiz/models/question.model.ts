export interface Question{
    id?:string;
    question: string;
    image?: string;
    options: string[];
    subject: string;
    chapter: string;
    source: string;
}