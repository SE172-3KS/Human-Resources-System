# 3ks-human-resources-system

### Installation Instructions
1. npm install

### Run application
1. npm run build
2. npm start (application will automatically recompile when you make changes -- excludes changes in server.js)
3. Ctrl+C to end application

### Database
1. Unzip db/test_db-master
2. Cd into test_db-master
3. Load data into MySQL using the cmd:
		mysql -t < employees.sql 
	 or mysql -r root -p -t < employees.sql (depends on how you setup ur mysql)
4. To verify the data is there and correct, run:
		time mysql -t < test_employees_sha.sql
		time mysql -t < test_employees_md5.sql
	Status should return all 'OK', removes the unzipped folder when you're done