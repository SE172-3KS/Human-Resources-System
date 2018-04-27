export default class Employee{
	constructor(empNo, first, last, gender, dob, hiredate, title, deptno, salary){
		this.first_name = first;
		this.last_name = last;
		this.emp_no = empNo;
		this.gender = gender;
		this.birth_date = toSQLFormatDate(dob);
		this.hire_date = toSQLFormatDate(hiredate);
		this.title = title;
		this.dept_no = deptno;
		this.salary = salary;
	}

	toSQLFormatDate(dateInput){
		var date = new Date(dateInput);
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        return year+"-"+month+"-"+day;
	}
}