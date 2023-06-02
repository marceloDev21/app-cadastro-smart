import { AdditionalTexts } from './additional-texts';
import { Age } from './age';
import { DateOfBirth } from './date-of-birth';
import { Document } from './document';
import { FullName } from './full-name';
import { Gender } from './gender';
import { PersonalNumber } from './personal-number';

export class Customer {
  age = new Age();
  gender = new Gender();
  fullName = new FullName();
  dateOfBirth = new DateOfBirth();
  personalNumber = new PersonalNumber();
  document = new Document();
  additionalTexts = new AdditionalTexts();
}
