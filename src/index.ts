import {app} from "./main/app";
import {SETTING} from "./main/setting"
import {addRoutes} from "./main/routes";
import {connectionToDB} from "./db/mongo-db";

const start = async  () =>{
    addRoutes(app);

    if(!connectionToDB()) {
        process.exit(1);
    }
    app.listen(SETTING.PORT, () => {
        console.log(`Example app listening on port ${SETTING.PORT}`)
    })

}

start();