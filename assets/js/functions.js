export async function getData(){
    try {
        let response = await fetch('assets/js/amazing.json')
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getDataPages(){
    try {
        let response = await fetch('../assets/js/amazing.json')
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
