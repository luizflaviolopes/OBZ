import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form action="http://localhost:5000/api/login" method="post">
                <input name="Login"></input>
                <input name="Password"></input>
                <button>enviar</button>
            </form>
        );
    }
}
