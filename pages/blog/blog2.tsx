import { motion } from "framer-motion";
import Layout, {
  variants,
} from "../../components/Layout elements/Layout/Layout";
import { Link, withTranslation } from "../../i18n";

function BlogSec() {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1>blog2</h1>
        <Link href="/">
          <a>home</a>
        </Link>
      </div>
    </motion.div>
  );
}
BlogSec.Layout = Layout;
export default BlogSec;
