import React from 'react';

import { Auth, I18n } from 'aws-amplify';

import AuthPiece from 'aws-amplify-react/dist/Auth/AuthPiece';
import {
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    InputRow,
    ButtonRow,
    Link
} from 'aws-amplify-react/dist/AmplifyUI';

export default class SignUp extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['signUp'];
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { username, password, email } = this.inputs;
        Auth.signUp(username, password, email )
            .then(() => this.changeState('confirmSignUp', username))
            .catch(err => this.error(err));
    }

    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(SignUp)) { return null; }

        return (
            <FormSection theme={theme}>
                <SectionHeader theme={theme}>{I18n.get('Sign Up Account')}</SectionHeader>
                <SectionBody theme={theme}>
                    <InputRow
                        autoFocus
                        placeholder={I18n.get('Username')}
                        theme={theme}
                        key="username"
                        name="username"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('Password')}
                        theme={theme}
                        type="password"
                        key="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('Email')}
                        theme={theme}
                        key="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <ButtonRow onClick={this.signUp} theme={theme}>
                        {I18n.get('Sign Up')}
                    </ButtonRow>
                </SectionBody>
                <SectionFooter theme={theme}>
                    <div style={theme.col6}>
                        <Link theme={theme} onClick={() => this.changeState('confirmSignUp')}>
                            {I18n.get('Confirm a Code')}
                        </Link>
                    </div>
                    <div style={Object.assign({textAlign: 'right'}, theme.col6)}>
                        <Link theme={theme} onClick={() => this.changeState('signIn')}>
                            {I18n.get('Sign In')}
                        </Link>
                    </div>
                </SectionFooter>
            </FormSection>
        )
    }
}