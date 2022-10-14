import styled from 'styled-components';
export const selectedCategoryDetailsStyle = styled.div`
.card{
    transition: 0.3s;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    width: fit-content;
    border: 1px solid grey;
    width:94%;
}
@media only screen and (min-width: 600px) {
  .card {
    width:98.6%;
    display: flex;
    justify-content: space-between;
  }
}
.selectedCategoryHeader{
    font-weight: 400
}
`