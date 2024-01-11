export const categories = [
  {
    name: 'tomorrowland',
    image: 'https://i.pinimg.com/originals/71/e4/ba/71e4bad54ebed7564259ee1b330c3649.jpg',
  },
  {
    name: 'ultra',
    image: 'https://i.pinimg.com/originals/c1/cb/60/c1cb606b45cd7973f74f05e772deb9e3.jpg',
  },
  {
    name: 'defqon.1',
    image: 'https://i.pinimg.com/564x/cd/9f/7f/cd9f7fa38bff4751feb4cae10427e061.jpg',
  },
  {
    name: 'mysteryland',
    image: 'https://i.pinimg.com/564x/d2/77/80/d27780a9f50d0646f0b37144f3c10f7a.jpg',
  },
  {
    name: 'medusa',
    image: 'https://i.pinimg.com/564x/6c/72/f9/6c72f9e9ff26609a6e463cb463158c40.jpg',
  },
  {
    name: 'reverze',
    image: 'https://i.pinimg.com/564x/d3/9e/35/d39e35b11948d3809cb4dbd062f39e6c.jpg',
  },
  {
    name: 'qlimax',
    image: 'https://i.pinimg.com/564x/29/01/40/2901406524d8e51666b9100a80467746.jpg',
  },
  {
    name: 'airbeat one',
    image: 'https://i.pinimg.com/564x/07/32/d0/0732d01abdb53110f78c8fd16657ff36.jpg',
  },
  {
    name: 'rave family',
    image: 'https://i.pinimg.com/564x/5b/cc/32/5bcc32cc48de71fcd5dc18285d18715b.jpg',
  },
  {
    name: 'festival outfits',
    image: 'https://i.pinimg.com/564x/f6/8e/3d/f68e3d747b1bb1b088db453a675cc16e.jpg',
  },
  {
    name: 'dumb things',
    image: 'https://i.pinimg.com/564x/93/82/bd/9382bd7da1eb4c611df150b361fed7fe.jpg',
  },
  {
    name: 'others',
    image: 'https://i.pinimg.com/564x/9d/8a/f4/9d8af446a7e8f27aef89e57e31c2fb02.jpg',
  }
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};