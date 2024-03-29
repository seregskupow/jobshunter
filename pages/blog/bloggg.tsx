import { motion } from "framer-motion";
import Layout, {
  variants,
} from "../../components/Layout elements/Layout/Layout";
import { withTranslation } from "../../i18n";

function Blog() {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 5 }}
    >
      <div>
        <h1>bloggg</h1>
      </div>
    </motion.div>
  );
}
Blog.Layout = Layout;
export default Blog;
