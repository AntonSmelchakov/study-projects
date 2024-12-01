export default function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; --i) {
        let r = Math.floor(Math.random() * (i + 1))
        let t = arr[i]
        arr[i] = arr[r]
        arr[r] = t
    }
    return arr
}