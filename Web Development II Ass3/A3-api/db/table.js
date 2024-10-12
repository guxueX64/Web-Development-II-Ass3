//Define an object named fundraiser to represent relevant information about fundraising activities
const fundraiser = {
    name: 'fundraiser', 
    fieds: ['fundraiser_id', 'organizer', 'caption','target_funding',
    'current_funding','city','active','category_id','fundraiser_image'], 
};

//Define an object named category to represent relevant information about the category
const category = {
    name: 'category', 
    fieds: ['category_id', 'name'], 
};

//Export funder and category objects
module.exports = {
    fundraiser,
    category
};