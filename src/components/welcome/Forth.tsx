import s from './welcome.module.scss';
import cloud from '../../assets/icons/cloud.svg';
import {FunctionalComponent} from "vue";
export const Forth: FunctionalComponent = () => (
    <div class={s.card}>
      <img src={cloud} alt=""/>
      <h2>每日提醒<br/>不遗漏每一笔账单</h2>
    </div>
)

Forth.displayName = 'Forth'