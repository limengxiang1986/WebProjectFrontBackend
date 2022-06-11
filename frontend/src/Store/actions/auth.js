import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = (history = null) => {
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('manager');
    localStorage.removeItem('tribe');
    localStorage.removeItem('squadGroup');
    localStorage.removeItem('site');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');
    if(history !== null) {
        history.push('/login')
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


export const authLogin = (userId, username, firstName, lastName, fullName, displayName, manager, site, tribe, squadGroup, password, token, userEmail) => {
    return dispatch => {
        dispatch(authStart());
                const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
                localStorage.setItem('id', userId);
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('displayName', displayName);
                localStorage.setItem('manager', manager);
                localStorage.setItem('tribe', tribe);
                localStorage.setItem('squadGroup', squadGroup);
                localStorage.setItem('site', site);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('email', userEmail);

                const previousUsername = localStorage.getItem('username');
                if (previousUsername && previousUsername !== username) {
                    localStorage.removeItem('kanbanboard_filter_assigneeToFind_label');
                    localStorage.removeItem('kanbanboard_filter_assigneeToFind_value');
                    localStorage.removeItem('kanbanboard_filter_jiraKeyToFind');
                    localStorage.removeItem('kanbanboard_filter_jiraInternalCaseIdToFind');
                    localStorage.removeItem('kanbanboard_filter_selectedOrganization');
                    localStorage.removeItem('kanbanboard_filter_summaryContainsSearch');
                }
                localStorage.setItem('username', username);

                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(86400));

    }
}


export const authCheckState = (history = null) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === 'undefined') {
            dispatch(logout(history));

        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout(history));
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
