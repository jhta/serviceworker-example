console.log("holi");
_500px.init({
    sdk_key: 'f52ba1390798baef4f44ea4b8374a5e750d61341'	//replace with your js sdk key
});

// Get my user id
//_500px.api('/users', (response) => {
var me = "jeisonhiguitas";
var siteurl = "http://500px.com/photo/"

// Get my favorites
//  users/:user_id/galleries/:id/items
_500px.api('/photos', {
    feature: 'popular',
    //username: me,
    //total_items: 5
    page: 1
}, (response) => {
  console.log(response);
});

_500px.api('/users/16595713/galleries/26456733/items', {
    //username: me,
    //total_items: 5
    //page: 1
    sort: 'rating',
    image_size: 6,
}, (response) => {
  var x = response.data.photos;
  x.forEach(el => {
    var y = document.createElement('img');
    y.setAttribute('src',el.image_url);
    console.log(y);
    var myRoot = document.getElementById('root');
    myRoot.appendChild(y);
  });
  console.log("galeries",response);
});
