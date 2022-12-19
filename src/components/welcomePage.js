export default function Welcome(props) {
    return (
        <>
            <h1>Welcome User</h1>

            <div className="task-area">
                <form onSubmit={props.handleSubmit}>
                    <input type="text" required placeholder="Please enter your username" />
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}