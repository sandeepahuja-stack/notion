const getPropertyDetail = (fieldName, columnDetails) => {
    const colDetail =columnDetails[fieldName];
    const {id, name, type}  = colDetail;
    console.log(colDetail[type]);
    return {
        id, name, type, [type] : colDetail[type]
    }
}



export default getPropertyDetail;