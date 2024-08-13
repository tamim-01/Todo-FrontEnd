export function Input ({type , id , name , style , placeholder , onChangeHandler , stateValue}){
    return (
        <input
                type={type}
                name={name}
                className={`${style} w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder={placeholder}
                value={stateValue}
                onChange={onChangeHandler}
              />
    )
}