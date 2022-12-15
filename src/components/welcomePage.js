export default function Welcome(props) {
    return (<div>

        <h1>Welcome User</h1>
        <p>Please enter your username</p>

        <form onSubmit={props.handleSubmit}>
            <input type="text" required />
            <input type="submit" />
        </form>
    </div>)
}