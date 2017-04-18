const myRoot = document.getElementById('root');

function createImg(element) {
  const $$image = document.createElement('img');
  $$image.setAttribute('src',element.image_url);
  myRoot.appendChild($$image);
}

function initAPI() {
  _500px.init({
      sdk_key: 'f52ba1390798baef4f44ea4b8374a5e750d61341'	//replace with your js sdk key
  });

  // Get my user id
  //_500px.api('/users', (response) => {
  var me = "jeisonhiguitas";
  var siteurl = "http://500px.com/photo/"

  // Get my favorites
  //  users/:user_id/galleries/:id/items
  /*_500px.api('/photos', {
      feature: 'popular',
      //username: me,
      //total_items: 5
      page: 1
  }, (response) => {
    console.log(response);
  });*/

  _500px.api('/users/16595713/galleries/26456733/items', {
      //username: me,
      //total_items: 5
      //page: 1
      sort: 'rating',
      image_size: 6,
  }, (response) => {
    const photos = response.data.photos;
    photos.forEach(createImg);
  });

}


function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js') //Note that we have not passed scope object here now by default it will pick root scope
      .then(() => {
           console.log('Service Worker Registered');
       })
       .catch(err => {
           console.error(err);
       })
  } else {
    console.log("your browser doesn't support sw");
  }
}

startServiceWorker();
//initAPI();
