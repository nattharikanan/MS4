export default function ({ $auth,next}) {

    if ($auth.user[0].status == "admin") {

    }
    else { 
        next("/");
    
    }

}