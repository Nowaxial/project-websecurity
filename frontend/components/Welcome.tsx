import Link from "next/link";

const Welcome = () => {
    return (
        <div className="wrapperWelcome">
            <h1>Välkommen till våran sida!</h1>
            <span>För att se och beställa biljetter till våra föreställningar så måste du vara medlem hos oss</span>
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