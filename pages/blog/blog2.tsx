
import { motion } from "framer-motion";
import Layout,{variants} from '../../components/Layout elements/Layout/Layout';
import {withTranslation } from '../../i18n';
function BlogSec() {
    return (
        <motion.div
        variants = {variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{duration:5}}
      >
        <div>
            <h1>blog2</h1>
        </div>
        </motion.div>
    )
}

export default BlogSec;