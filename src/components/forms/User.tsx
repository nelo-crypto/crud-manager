import {Col, Row} from 'react-bootstrap'

interface UserProps {
    user: User,
    userNameChangeCallback?: User[],
    userEmailChangeCallback?: User[],
    userImageChangeCallback?: User[],
    userRoleChangeCallback?: User[],
    disabled: boolean,
}

export default function User({
                                 user,
                                 userNameChangeCallback,
                                 userEmailChangeCallback,
                                 userImageChangeCallback,
                                 userRoleChangeCallback,
                                 disabled,
                             }: UserProps) {
    return (
        <>
            <Row>
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Name</legend>
                        <input className="form-control"
                               defaultValue={user.name}
                               placeholder="Name"
                               disabled={disabled}
                               onChange={userNameChangeCallback}
                               type="text"/>
                    </fieldset>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Email</legend>
                        <input className="form-control"
                               defaultValue={user.email}
                               placeholder="Email"
                               onChange={userEmailChangeCallback}
                               disabled={disabled}
                               type="email"/>
                    </fieldset>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Image</legend>
                        <input className="form-control"
                               defaultValue={user.image}
                               placeholder="Image"
                               onChange={userImageChangeCallback}
                               disabled={disabled}
                               type="text"/>
                    </fieldset>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    <fieldset className="form-group">
                        <legend className="mt-1">Role</legend>
                        <select name="role"
                                onChange={userRoleChangeCallback}
                                disabled={disabled}
                                defaultValue={user.role}>
                            <option value="">..
                            </option>
                            <option value="USER">USER
                            </option>
                            <option value="ADMIN">ADMIN
                            </option>
                        </select>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}
