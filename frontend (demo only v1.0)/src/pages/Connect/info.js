import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';

const profiles = [
    {
      name: 'John Doe',
      profession: 'Software Engineer',
      img: img1,
      location: 'San Francisco, CA',
      wages: '$100/hr',
      times: 'Full-time',
      exp: '5 years',
    },
    {
      name: 'Jane Smith',
      profession: 'Graphic Designer',
      img: img1,
      location: 'Bihar',
      wages: '$80/hr',
      times: 'Part-time',
      exp: '3 years',
    },
    {
        name: 'Anmol Kaw',
        profession: 'Project Manager Sahab',
        img: img2,
        location: 'Delhi',
        wages: '$100/hr',
        times: 'FreeLancer',
        exp: '30 years',
    },
    {
        name: 'Devank Singh',
        profession: 'Frontend',
        img: img1,
        location: 'New York, NY',
        wages: '$80/hr',
        times: 'Part-time',
        exp: '3 years',
    },
    {
        name: 'Vignesh Goswami',
        profession: 'Backend',
        img: img1,
        location: 'New York, NY',
        wages: '$80/hr',
        times: 'Part-time',
        exp: '3 years',
    },
    // Add more profiles as needed
];

const professions = [
  { name: 'Marketing', icon: 'fa-mail-bulk', available: 123 },
  { name: 'Customer Service', icon: 'fa-headset', available: 123 },
  { name: 'Human Resource', icon: 'fa-user-tie', available: 123 },
  { name: 'Project Management', icon: 'fa-tasks', available: 123 },
  { name: 'Business Development', icon: 'fa-chart-line', available: 123 },
  { name: 'Sales & Communication', icon: 'fa-hands-helping', available: 123 },
  { name: 'Web Development', icon: 'fa-book-reader', available: 123 },
  { name: 'Design & Creative', icon: 'fa-drafting-compass', available: 123 },
];

export { profiles, professions };