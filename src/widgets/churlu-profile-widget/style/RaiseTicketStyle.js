import styled from 'styled-components'
export const raiseTicketStyle = styled.div `
.edit-profile-component{
    margin: auto;
    display: flex;
    flex-direction: column;
    .profile-header-component{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 2rem;
    }
    .margin-top-arrow-profile{
        margin-top: 2px;
    }
    .profile-body-component{
        margin-top: 1rem;
        .body-border{
            background-color: white;
            border: 1px solid gray;
            padding: 10px;
            margin-bottom: 1rem;
        }
        .edit-profile-buttons{
            flex-direction: row;
            display: flex;
            margin-top: 1rem;
            margin-bottom: 1rem;
            .cancel-button{
                margin-right: 2rem;
            }
        }
    }
    ..pointer-cursor{
        padding-top: 2px;
    }
    @media only screen and (max-width: 600px){
        .margin-top-arrow-profile{
        font-size: 26px;
        padding-bottom: 10px;
    }
    }
    .ticket-type{
        margin-left: auto;
        margin-right: auto;
    }
    .profile-body-component{
        .MuiGrid-root{
            .MuiGrid-item{
                .MuiFormControl-root{
                    display: flex;
                }
            }
        }
    }
    
}`