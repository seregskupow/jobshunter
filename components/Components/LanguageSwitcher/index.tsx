import { i18n } from '../../../i18n';
import { I18nContext } from 'next-i18next';
import { useContext } from 'react'
import './style.scss';

function LanguageSwitcher(){
    const { i18n: { language } } = useContext(I18nContext);
    const activeStyle = {
        background: "#000",
        color:" #fff",
    }
    return(
        <div className="language-switcher">
            <fieldset>
				<input type="radio" name="duration-1" checked={language === 'ua' && true} value="monthly" id="monthly-1" onClick={() => i18n.changeLanguage('ua')} />
				<label htmlFor="monthly-1" className={`${language === 'ua' ? 'lang-toggled': ''}`}>УКР</label>
				<input type="radio" checked={language === 'ru' && true} name="duration-1" value="yearly" id="yearly-1" onClick={() => i18n.changeLanguage('ru')} />
				<label htmlFor="yearly-1" className={`${language === 'ru' ? 'lang-toggled': ''}`}>РУС</label>
				<span className="switch"></span>
			</fieldset>
            {/* <button type="button" onClick={() => i18n.changeLanguage('ua')} className={language === 'ua' ? 'is-active': ''}>UA</button>
            <button type="button" onClick={() => i18n.changeLanguage('ru')} className={language === 'ru' ? 'is-active': ''}>RU</button> */}
        </div>
    )
}

export default LanguageSwitcher;