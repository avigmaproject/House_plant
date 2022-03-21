import Realm from "realm";

export const Quiz_Master_Schema = "Quiz_Master";
export const Answer_Master_Schema = "Answer_Master";

export const Quiz_Master = {
  name: Quiz_Master_Schema,
  primaryKey: "QZ_PkeyID",
  properties: {
    QZ_PkeyID: "int",
    QZ_Quiz_Name: "string?",
    QZ_Quiz_No: "string?",
    QZ_Quiz_Yes: "string?",
    QZ_Quiz_Desc: "string?",
    QZ_ImagePath: "string?",
    QZ_Quiz_No_val: "int",
    QZ_Quiz_Yes_val: "int",
  },
};
export const Answer_Master = {
  name: Answer_Master_Schema,
  primaryKey: "QA_PkeyID",
  properties: {
    QA_PkeyID: "int",
    QU_UserID: "int",
    QU_QuizID: "int",
    QU_Quiz_Answer: "string?",
  },
};
const databaseOptions = {
  path: "houseplant41.realm",
  schema: [Quiz_Master, Answer_Master],
  schemaVersion: 18,
};
export const InsertAnswerMaster = (data) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(Answer_Master_Schema, data);
          resolve();
          // console.log("success");
        });
      })
      .catch((error) => {
        console.log("InsertErrorAnswer", error);
        reject(error);
      });
  });
export const queryAllAnswerMaster = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let asnwer = realm.objects(Answer_Master_Schema);
        // console.log("single user data", JSON.parse(JSON.stringify(asnwer)));
        resolve([JSON.parse(JSON.stringify(asnwer))]);
      })
      .catch((error) => {
        console.log("queryAllAnswerMastererror", error);
        reject(error);
      });
  });
export const InsertQuizMaster = (data) =>
  new Promise((resolve, reject) => {
    // console.log("InsertQuizMaster", data);
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(Quiz_Master_Schema, data);
          resolve();
          console.log("success");
        });
      })
      .catch((error) => {
        console.log("InsertError", error);
        reject(error);
      });
  });
export const queryAllQuizMaster = (data) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let user = realm
          .objects(Quiz_Master_Schema)
          .filtered(`QZ_PkeyID = ${data}`);
        // console.log("single user data", JSON.parse(JSON.stringify(user)));
        resolve([JSON.parse(JSON.stringify(user))]);
      })
      .catch((error) => {
        console.log("queryAllQuizMastererror", error);
        reject(error);
      });
  });
export const DeleteQuizMaster = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let QuizMaster = realm.objects(Quiz_Master_Schema); //.filtered('Inv_Con_pkeyId = "' + id + '"');
          realm.delete(QuizMaster);
          resolve();
          console.log("successdeleteQuizMaster");
        });
      })
      .catch((error) => {
        console.log("DeleteAnserMaster", error);
        reject(error);
      });
  });
export const DeleteAnserMaster = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let AnswerMaster = realm.objects(Answer_Master_Schema); //.filtered('Inv_Con_pkeyId = "' + id + '"');
          realm.delete(AnswerMaster);
          resolve();
          console.log("successdelete");
        });
      })
      .catch((error) => {
        console.log("DeleteAnserMaster", error);
        reject(error);
      });
  });
export default new Realm(databaseOptions);
