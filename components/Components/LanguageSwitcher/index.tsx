import { i18n } from '../../../i18n';
import { I18nContext } from 'next-i18next';
import { useContext } from 'react'
import './style.scss';
import WhitePanel from '../../Layout elements/WhitePanel';

function LanguageSwitcher(){
    const { i18n: { language } } = useContext(I18nContext);
    const activeStyle = {
        background: "#000",
        color:" #fff",
    }
    return(
        <WhitePanel>
            <button type="button" onClick={() => i18n.changeLanguage('ua')} className={language === 'ua' ? 'is-active': ''}>UA</button>
            <button type="button" onClick={() => i18n.changeLanguage('ru')} className={language === 'ru' ? 'is-active': ''}>RU</button>
        </WhitePanel>
    )
}

export default LanguageSwitcher;