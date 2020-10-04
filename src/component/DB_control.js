import Firebase from '../../config/Firebase';

export const loadProjectTypes = () => {
  let path = "db/projectTypes";
  let ref = Firebase.database().ref(path);
  let projectTypes = [];

  ref.once("value", (snapshot) => {
    snapshot.forEach(function (child) { 
      let childVal = child.val();
      projectTypes.push(childVal);
    });
  });
//   saveData("project_types", projectTypes);
  return projectTypes;
};

// const loadConcernList = () => {
//   let path = "db/concernList";
//   let ref = firebase.database().ref(path);
//   let concernList = [];

//   ref.once("value", (snapshot) => {
//     snapshot.forEach(function (child) { 
//       let childVal = child.val();
//       concernList.push(childVal);
//     });
//   });


//   saveData("concern_list", concernList);
// };

// const loadDefaultProjects = () => {
//   let path = "db/defaultProjects";
//   let ref = firebase.database().ref(path);
//   let defaultProjects = [];

//   ref.once("value", (snapshot) => {
//     snapshot.forEach(function (child) { 
//       let childVal = child.val();
//       defaultProjects.push(childVal);
//     });
//   });

//   saveData("default_projects", defaultProjects);
// };

// const loadRooms = () => {
//   let path = "db/rooms";
//   let ref = firebase.database().ref(path);
//   let rooms = [];

//   ref.once("value", (snapshot) => {
//     snapshot.forEach(function (child) { 
//       let childVal = child.val();
//       rooms.push(childVal);
//     });
//   });
//   saveData("rooms", rooms);
// };

// const loadItems = () => {
//   let path = "db/items";
//   let ref = firebase.database().ref(path);
//   let items = [];

//   ref.once("value", (snapshot) => {
//     snapshot.forEach(function (child) { 
//       let childVal = child.val();
//       items.push(childVal);
//     });
//   });

//   saveData("items", items);
// };

// const loadInspections = () => {
//   let UUID = firebase.auth().currentUser.uid;
//   let path = "db/inspectorProjects";
//   let ref = firebase.database().ref(path).orderByChild("user_id").equalTo(UUID);
//   let inspections = [];
//   let inspectorProjects = [];

//   ref.once("value", (snapshot) => {
//     snapshot.forEach(function (child) {
//       let childVal = child.val();
//       inspectorProjects.push(childVal);
//       firebase
//         .database()
//         .ref("db/inspections/" + childVal.project_id)
//         .once("value", (childInfo) => {
//           let inspection = childInfo.val();
//           inspections.push(inspection);
//         });
//     });

//     saveData("inspections", inspections);
//     saveData("inspector_projects", inspectorProjects);
//   });

// };


// export const saveData = (name, results) => {
//   results.forEach(function (result) {
//     let keys = Object.keys(result).join(",");
//     let values = Object.values(result).join("','");

//     let sqlInsert = "INSERT INTO " + name;
//     let queryInsert = sqlInsert + " (" + keys + ") values ('" + values + "')";

//     let sqlReplace = "REPLACE INTO " + name;
//     let queryReplace = sqlReplace + " (" + keys + ") values ('" + values + "')";
    
//     db.transaction((tx) => {
//       tx.executeSql(queryInsert, [], [], (t, error) => {
//         tx.executeSql(queryReplace, [], [], (t, error) => {
//           console.log({replace: error})
//         });
//       });
//       tx.executeSql("SELECT * FROM " + name, [], (_, { rows: { _array } }) => console.log(_array))
//     });
//   });
// };
