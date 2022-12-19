export default function Welcome(props) {
    return (
        <>
            <h1>Welcome User</h1>
            <p className="intro">Place where you can add all your tasks and keep track of the completed one</p>
            <div>
                <form onSubmit={props.handleSubmit} className="username-input">
                    <input type="text" required placeholder="Please enter your username" />
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}