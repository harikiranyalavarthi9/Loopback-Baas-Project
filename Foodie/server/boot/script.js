module.exports = function(app) {
    var MongoDB = app.dataSources.MongoDB;
    
    MongoDB.automigrate('Customer', function(err) {
       if (err) throw (err);
       var Customer = app.models.Customer;
    
       Customer.create([
        {username: 'admin', email: 'admin@gmail.com', password: 'admin'},
        {username: 'hari', email: 'hari@gmail.com', password: 'admin123'}
      ], function(err, users) {
        if (err) throw (err);
         var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
    
        //create the admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) throw (err);
           //make admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) throw (err);
          });
        });
      });
    });
    
};