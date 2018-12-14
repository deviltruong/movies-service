const verb = {
  index: 'get',
  show: 'get',
  create: 'post',
  update: 'patch',
  delete: 'delete',
};

const createURI = (name, action) => {
  if (action === 'show' || action === 'update' || action === 'delete') {
    return `/${name}/:id`;
  }
  return `/${name}`;
};

module.exports = (name, app, controller) => {
  Object.keys(verb).forEach((action) => {
    if (controller[action]) {
      const httpVerb = verb[action];
      app[httpVerb](createURI(name, action), controller[action]);
    }
  });
  return app;
};
