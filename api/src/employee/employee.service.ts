import { Injectable } from '@nestjs/common';

import { Employee} from './employee.entity'
import { Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { CreateEmployeeInput } from './employee.input';

@Injectable()
export class EmployeeService {


    constructor(
        @InjectRepository(Employee) private employeeRepository : Repository<Employee>
    ){


    }


  async  getAllEmp() : Promise<Employee[]> {

       
        return   this.employeeRepository.find()
    }

    async getEmpById(employee_id: number) : Promise<Employee> {

        this.getEmpByCompanyId('AT')

        return this.employeeRepository.findOne({ employee_id })
    }

   async  addEmp(createEmpInput : CreateEmployeeInput) : Promise <Employee> {
        const {  employee_Name, monthly_budget, company_id, company_title  } = createEmpInput

       const createdEmp = this.employeeRepository.create({
            employee_Name,
            monthly_budget,
            company_id,
            company_title
        })
        
        return await  this.employeeRepository.save(createdEmp)


    }

    async getEmpByCompanyId(companyName : string) : Promise <any>{
        const query = this.employeeRepository.createQueryBuilder()


       const empByCom = await  query.select("Employee.employee_Name")
                                     .where('Employee.company_title = :companyName' ,{ companyName : companyName})
                                    //)
                                     .execute()  
        console.log({ empByCom})

    }


}
