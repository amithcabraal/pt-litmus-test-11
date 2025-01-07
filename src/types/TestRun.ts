export interface Label {
  id: number;
  name: string;
  color: string;
  parent_id: number;
  fullName: string;
}

export interface TerminationData {
  id: string;
  params: Record<string, any>;
}

export interface TestRun {
  run_id: number;
  name: string;
  ui_status: string;
  trigger_start_time: string;
  duration: string;
  test_run_user: string;
  create_by: string;
  archive_status: string | null;
  is_note_exists: boolean;
  client_breakdown: any;
  client_breakdown_enabled: boolean;
  test_id: number;
  loadtestbegintime: string;
  loadtestendtime: string;
  termination_data: TerminationData;
  dev_vusers_num: number;
  api_vusers_num: number;
  ui_vusers_num: number;
  erp_vusers_num: number;
  legacy_vusers_num: number;
  mobile_vusers_num: number;
  total_count: string;
  labels: Label[];
}