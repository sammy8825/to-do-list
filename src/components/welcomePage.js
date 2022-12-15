export default function Welcome(props) {
    return (<div>

        <h1>Welcome User</h1>

        <form onSubmit={props.handleSubmit}>
            <input type="text" required placeholder="Please enter your username" />
            <input type="submit" />
        </form>
    </div>)
}