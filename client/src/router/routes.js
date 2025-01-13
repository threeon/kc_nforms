// 관리자
import AdminHome from "@/components/Admin/AdminHome.vue";

// 정보 DB DATA MANAGE
import RicChange from "@/components/Admin/DataManage/RicChange.vue";
import ReportCode from "@/components/Admin/DataManage/ReportCode.vue";
import BondIndexUpload from "@/components/Admin/DataManage/BondIndexUpload.vue";
import BondIndexMod from "@/components/Admin/DataManage/BondIndexMod.vue";
import WorldIndexUpload from "@/components/Admin/DataManage/WorldIndexUpload.vue";
import WorldIndexMod from "@/components/Admin/DataManage/WorldIndexMod.vue";
// 정보 DB DATA MANAGE (반도체)
import SemiMasterUpload from "@/components/Admin/DataManage/Semi/SemiMasterUpload.vue";
import SemiMasterMod from "@/components/Admin/DataManage/Semi/SemiMasterMod.vue";
import SemiInUpload from "@/components/Admin/DataManage/Semi/SemiInUpload.vue";
import SemiInMod from "@/components/Admin/DataManage/Semi/SemiInMod.vue";
import SemiIndexUpload from "@/components/Admin/DataManage/Semi/SemiIndexUpload.vue";
import SemiIndexMod from "@/components/Admin/DataManage/Semi/SemiIndexMod.vue";

// ETP DB DATA MANAGE
import M054udate from "@/components/Admin/Migration/M054udate.vue";

// ETP DB DATA MANAGE
import EtfDivInfo from "@/components/Admin/Etp/EtfDivInfo.vue";
import EtfFeeInfo from "@/components/Admin/Etp/EtfFeeInfo.vue";
import EtfCtgInfo from "@/components/Admin/Etp/EtfCtgInfo.vue";
import EtpCorrelFile from "@/components/Admin/Etp/EtpCorrelFile.vue";

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
      { path: "bondindexupload", component: BondIndexUpload },
      { path: "bondindexmod", component: BondIndexMod },
      { path: "worldindexupload", component: WorldIndexUpload },
      { path: "worldindexmod", component: WorldIndexMod },
      // 정보DB DATA MANAGE(반도체)
      { path: "semimasterupload", component: SemiMasterUpload },
      { path: "semimastermod", component: SemiMasterMod },
      { path: "semiinupload", component: SemiInUpload },
      { path: "semiinmod", component: SemiInMod },
      { path: "semiindexupload", component: SemiIndexUpload },
      { path: "semiindexmod", component: SemiIndexMod },
      // MIGRATION
      { path: "migration/m054udate", component: M054udate },
      // ETP DB DATA MANAGE
      { path: "etfdivinfo", component: EtfDivInfo },
      { path: "etffeeinfo", component: EtfFeeInfo },
      { path: "etfctginfo", component: EtfCtgInfo },
      { path: "etpcorrelfile", component: EtpCorrelFile },
      // MEMBER MANAGE
      { path: "member", component: MemberManage },
    ],
  },
];
