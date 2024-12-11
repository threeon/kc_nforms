// 관리자
import AdminHome from "@/components/Admin/AdminHome.vue";

// 정보 DB DATA MANAGE
import RicChange from "@/components/Admin/DataManage/RicChange.vue";
import ReportCode from "@/components/Admin/DataManage/ReportCode.vue";
import BondIndexUpload from "@/components/Admin/DataManage/BondIndexUpload.vue";
import BondIndexMod from "@/components/Admin/DataManage/BondIndexMod.vue";
import WorldIndexUpload from "@/components/Admin/DataManage/WorldIndexUpload.vue";
import WorldIndexMod from "@/components/Admin/DataManage/WorldIndexMod.vue";

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
