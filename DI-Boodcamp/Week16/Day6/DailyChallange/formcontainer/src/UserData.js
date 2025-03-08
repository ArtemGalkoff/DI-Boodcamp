const UserData = (props) => {
    let { handleSubmit } = props
    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputWithLabel id="name" label="Name" type="text" />
                <InputWithLabel id="age" label="Age" type="number" />
                <InputWithLabel id="email" label="Email" type="email" />
                <button type="submit">Submit</button>
                <input type="radio" name="gender" value="male" />
                <input type="radio" name="gender" value="female" />
            </form>
        </>

    )
}

const InputWithLabel = (props) => {
    let { id, label, type } = props
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
            />
        </>
    );
}

export default UserData;