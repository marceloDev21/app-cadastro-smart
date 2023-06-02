import { AdditionalTexts } from './additional-texts';
import { DateOfExpiry } from './date-of-expiry';
import { DateOfIssue } from './date-of-issue';
import { DocumentNumber } from './document-number';
import { Links } from './links';
import { Type } from './type';

export class Document {
  type = new Type();
  pageTypes!: string[];
  dateOfIssue = new DateOfIssue();
  dateOfExpiry = new DateOfExpiry();
  documentNumber = new DocumentNumber();
  additionalTexts = new AdditionalTexts();
  links = new Links();
}
