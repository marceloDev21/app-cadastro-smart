import { City } from './city';
import { DateOfFirstIteration } from './date-of-firstIteration';
import { DrivingCategorie } from './driving-categorie';
import { FathersName } from './fathers-name';
import { LicenceNumber } from './licence-number';
import { MothersName } from './mothers-name';
import { SecurityNumber } from './security-number';
import { TaxNo } from './tax-no';

export class AdditionalTexts {
  taxNo = new TaxNo();
  fathersName = new FathersName();
  securityNumber = new SecurityNumber();
  mothersName = new MothersName();
  dateOfFirstIteration = new DateOfFirstIteration();
  city = new City();
  licenceNumber = new LicenceNumber();
  drivingCategories = new DrivingCategorie();
}
