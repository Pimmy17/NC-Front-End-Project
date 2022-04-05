import codingpicture from './images/coding.jpg'
import cookingpicture from './images/cooking.jpg'
import footballpicture from './images/football.jpg'

export default function ArticleImage ({topic}) {
   if(topic === 'cooking') return <img src={cookingpicture} alt='A plate of salad with strips of meat' className='articleCard-image' />
   else if(topic === 'coding') return <img src={codingpicture} alt='A computer screen with several lines of code' className='articleCard-image' />
   else return <img src={footballpicture} alt='Female footballer shooting towards a goal' className='articleCard-image' />
}