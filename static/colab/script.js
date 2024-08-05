// Initialize variables
let searchQuery = '';
let selectedProfession = null;
let recommendedProfiles = profiles;

// Handle search input change
function handleSearchChange(e) {
  searchQuery = e.target.value;
}

// Handle profession selection
function handleProfessionSelect(professionName) {
  selectedProfession = professionName;
}

// Handle recommended profiles update
function handleRecomSelect(r) {
  recommendedProfiles = r;
}

// Handle view profile navigation
function handleViewProfile(userId) {
  window.location.href = `/profile/${userId}`;
}

// Filter profiles by category
function filterProfilesByCategory(category) {
  recommendedProfiles = profiles.filter(profile => profile.times === category);
}

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

  const profiles = [
    {
      id: "1",
      name: 'John Doe',
      profession: 'Software Engineer',
      img: img1,
      location: 'San Francisco, CA',
      wages: '$100/hr',
      times: 'Full-time',
      exp: '5 years',
    },
    {
      id: "2",
      name: 'Jane Smith',
      profession: 'Graphic Designer',
      img: img1,
      location: 'Bihar',
      wages: '$80/hr',
      times: 'Part-time',
      exp: '3 years',
    },
    {
      id: "3",
      name: 'Rohan',
      profession: 'Project Manager',
      img: img2,
      location: 'Delhi',
      wages: '$100/hr',
      times: 'Free Lancer',
      exp: '30 years',
    },
    {
      id: "4",
      name: 'Mohan',
      profession: 'Frontend',
      img: img1,
      location: 'New York, NY',
      wages: '$80/hr',
      times: 'Part-time',
      exp: '3 years',
    },
    {
      id: "6",
      name: 'Sohan',
      profession: 'Backend',
      img: img1,
      location: 'New York, NY',
      wages: '$80/hr',
      times: 'Part-time',
      exp: '3 years',
    }
  ];