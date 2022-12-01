import Link from "next/link";

const Welcome = () => {
    return (
        <div className="wrapperWelcome">
            <h1>Välkommen hit!!</h1>
            <span>Denna sidan är under uppbyggnad men du kan skapa ett konto för att ta del av allt det nya som kommer inom snar framtid!</span>
            <span>Vill du skapa ett konto hos oss eller logga in?</span>
            <br/>
            <br/>
            <Link href={"/register"}>
            <button className="btnWelcome">Skapa konto</button>
            </Link>
            <Link href={"/login"}>
            <button className="btnWelcome">Logga in</button>
            </Link>
        </div>
    );
}

export default Welcome;