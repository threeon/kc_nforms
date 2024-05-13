// 관리자
import AdminHome from "@/components/Admin/AdminHome.vue";

// 정보 DB DATA MANAGE
import RicChange from "@/components/Admin/DataManage/RicChange.vue";
import ReportCode from "@/components/Admin/DataManage/ReportCode.vue";
import BondIndex from "@/components/Admin/DataManage/BondIndex.vue";
import BondIndexMod from "@/components/Admin/DataManage/BondIndexMod.vue";

// ETP DB DATA MANAGE
import EtfDivInfo from "@/components/Admin/Etp/EtfDivInfo.vue";
import EtfFeeInfo from "@/components/Admin/Etp/EtfFeeInfo.vue";
import EtfCtgInfo from "@/components/Admin/Etp/EtfCtgInfo.vue";

// MEMBER MANAGE
import MemberManage from "@/components/Admin/Member/MemberManage.vue";

//export const routes = [
export default [
  {
    path: "/admintool",
    component: AdminHome,
    children: [
      // 정보DB DATA MANAGE
      { path: "ricchange", component: RicChange },
      { path: "reportcode", component: ReportCode },
      { path: "bondindex", component: BondIndex },
      { path: "bondindexmod", component: BondIndexMod },
      // ETP DB DATA MANAGE
      { path: "etfdivinfo", component: EtfDivInfo },
      { path: "etffeeinfo", component: EtfFeeInfo },
      { path: "etfctginfo", component: EtfCtgInfo },
      // MEMBER MANAGE
      { path: "member", component: MemberManage },
    ],
  },
];
