## STUDENT TIMETABLE GENERATOR SYSTEM
<h4>General Objectives</h4>
<ul>
<li>Authentication: login & logout</li>
<li>Creating different entities: schools, departments, courses, units, venues, exams, lecturers, lectures</li>
<li>Editing the entities</li>
<li>Showing all entities</li>
<li>Deleting entities</li>
<li>Fetching the lectures and exams based on parameters such as course, year and semester</li>
</ul>
<h4>How To Use</h4>
<ul>
<li>Clone the repository </li>
<li>You need to have MongoDB installed in your device. For better interaction also have MongoDB compass</li>
<li>Run <code>npm install</code> while the current working directory is on the project in order to install the dependencies</li>
<li>To start the server run <code>npm run start-server</code></li>
<li>Since it is a backend API project it is recommended to use Postman app to test the routes to get server responses</li>
</ul>
<h4>Routes</h4>

##### Authentication routes
<ul>
<li><code>'http://localhost:[PORT]/api/login'</code></li>
<li><code>'http://localhost:[PORT]/api/register'</code></li>
<li><code>'http://localhost:[PORT]/api/logout'</code></li>
</ul>

##### Creating Entities
<ul>
<li><code>'http://localhost:[PORT]/api/schools/add'</code></li>
<li><code>'http://localhost:[PORT]/api/venues/add'</code></li>
<li><code>'http://localhost:[PORT]/api/courses/add'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturerdepartments/add'</code></li>
<li><code>'http://localhost:[PORT]/api/departments/add'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturers/add'</code></li>
<li><code>'http://localhost:[PORT]/api/lectures/add'</code></li>
<li><code>'http://localhost:[PORT]/api/units/add'</code></li>
<li><code>'http://localhost:[PORT]/api/unitcourses/add'</code></li>
<li><code>'http://localhost:[PORT]/api/exams/add'</code></li>
<li><code>'http://localhost:[PORT]/api/staticlectures/add'</code></li>
</ul>

##### Showing and fetching entities
<ul>
<li><code>'http://localhost:[PORT]/api/schools'</code></li>
<li><code>'http://localhost:[PORT]/api/venues'</code></li>
<li><code>'http://localhost:[PORT]/api/courses'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturerdepartments'</code></li>
<li><code>'http://localhost:[PORT]/api/departments'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturers'</code></li>
<li><code>'http://localhost:[PORT]/api/lectures'</code></li>
<li><code>'http://localhost:[PORT]/api/lectures/fetch'</code></li>
<li><code>'http://localhost:[PORT]/api/units'</code></li>
<li><code>'http://localhost:[PORT]/api/unitcourses'</code></li>
<li><code>'http://localhost:[PORT]/api/exams'</code></li>
<li><code>'http://localhost:[PORT]/api/exams/fetch'</code></li>
<li><code>'http://localhost:[PORT]/api/staticlectures'</code></li>
<li><code>'http://localhost:[PORT]/api/staticlectures/fetch'</code></li>
</ul>

##### Updating entities
<ul>
<li><code>'http://localhost:[PORT]/api/schools/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/venues/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/courses/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturerdepartments/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/departments/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturers/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lectures/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/units/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/unitcourses/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/exams/edit/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/staticlectures/edit/:id'</code></li>
</ul>

##### Deleting entities
<ul>
<li><code>'http://localhost:[PORT]/api/schools/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/venues/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/courses/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturerdepartments/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/departments/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lecturers/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/lectures/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/units/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/unitcourses/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/exams/delete/:id'</code></li>
<li><code>'http://localhost:[PORT]/api/staticlectures/delete/:id'</code></li>
</ul>